pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract EVMContract {
    struct Candidate {
        string name;
        uint voteCount;
        bool hasRegistered;
        address ethAddress;
    }
    
    address public admin;
    bool public isRegistrationOpen = false;
    bool public canVote = false;

    Candidate public winner;

    mapping(address => Candidate)  candidates;
    mapping(address => bool) public hasVoted;
    address[] public candidateAddresses;

    constructor() public {
        admin = msg.sender;
        isRegistrationOpen = true;
    }

    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    modifier hasNotVotedEarlier {
        require(!hasVoted[msg.sender]);
        _;
    }

    modifier hasNotRegisteredEarlier {
        require(
            !candidates[msg.sender].hasRegistered,
            "Candidate has already registered"
        );
        _;
    }

    function closeRegistration() public onlyAdmin {
        isRegistrationOpen = false;
    }
  function getCandidateData(address ethAddress) public view returns (Candidate memory){
     return candidates[ethAddress];
     
    }

    function register(string memory _name) public hasNotRegisteredEarlier {
        require(isRegistrationOpen, "Registrations are not open right now");
        candidates[msg.sender] = Candidate({
            name: _name,
            voteCount: 0,
            hasRegistered: true,
            ethAddress: msg.sender
        });
        candidateAddresses.push(msg.sender);
    }

    function startVoting() public onlyAdmin {
        require(!isRegistrationOpen, "Registration hasn't ended yet");
        canVote = true;
    }

    function getCandidateList() public view returns( address[] memory) {
        return candidateAddresses;
    }

    function vote(address candidateEthAddress) public  hasNotVotedEarlier returns ( Candidate memory)   {
        Candidate storage candidate = candidates[candidateEthAddress];
        candidate.voteCount += 1;
        if (winner.voteCount < candidate.voteCount) {
            winner = candidate;
        }
        hasVoted[msg.sender] = true;
        return  candidates[candidateEthAddress];
    }

    function closeVoting() public onlyAdmin {
        canVote = false;
    }

}
