"use client";

import { useParams } from "next/navigation";

export default function GroupDetailPage() {
  const { id } = useParams();

  // Temporary mock data — same as in your main group list
  const groups = [
    { id: 1, name: "Crypto Developers DAO", members: 124, description: "A group for developers building decentralized apps and smart contracts." },
    { id: 2, name: "Blockchain Designers", members: 67, description: "Designers focused on UI/UX for Web3 platforms." },
    { id: 3, name: "NFT Creators Hub", members: 210, description: "Artists and creators exploring NFTs and digital ownership." },
    { id: 4, name: "DeFi Builders", members: 89, description: "Developers working on decentralized finance projects." },
    { id: 5, name: "Voting DAO Demo", members: 35, description: "A test group for learning and experimenting with DAO voting systems." },
  ];

  // Find group by id
  const group = groups.find((g) => g.id === Number(id));

  if (!group) {
    return <p className="p-6 text-gray-600">Group not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{group.name}</h2>
      <p className="text-gray-700 mb-4">{group.description}</p>
      <p className="text-sm text-gray-500">Members: {group.members}</p>
    </div>
  );
}
