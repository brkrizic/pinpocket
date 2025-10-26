import Link from "next/link";


export default function GroupPage(){
    const groups = [
        { id: 1, name: "Crypto Developers DAO", members: 124, description: "A group for developers building decentralized apps and smart contracts." },
        { id: 2, name: "Blockchain Designers", members: 67, description: "Designers focused on UI/UX for Web3 platforms." },
        { id: 3, name: "NFT Creators Hub", members: 210, description: "Artists and creators exploring NFTs and digital ownership." },
        { id: 4, name: "DeFi Builders", members: 89, description: "Developers working on decentralized finance projects." },
        { id: 5, name: "Voting DAO Demo", members: 35, description: "A test group for learning and experimenting with DAO voting systems." },
    ];
    
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Groups</h2>
            <div className="flex justify-end mb-4 gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    + New Group
                </button>
                </div>
            <ul className="space-y-4">
                {groups.map((group) => (
                <li key={group.id} className="p-4 rounded-2xl shadow hover:shadow-lg transition bg-white border">
                      <Link href={`/dashboard/groups/${group.id}`} className="hover:underline">
                        <h3 className="text-xl font-semibold">{group.name}</h3>
                        <p className="text-sm text-gray-500">Members: {group.members}</p>
                      </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}