import { MessageThread } from "./types";

export const messageThreads: MessageThread[] = [
  {
    id: "thread-ortho-7w",
    subject: "Orthopedics 7W — Night shift gap (2 RNs)",
    unitName: "Orthopedics 7W",
    participants: ["Sarah Mitchell", "Priya Nair", "Jordan Patel", "ShiftBridge AI"],
    messages: [
      {
        id: "m1",
        author: "ShiftBridge AI",
        role: "System",
        isSystem: true,
        timestamp: "2:16 PM",
        body: "New staffing request created for Orthopedics 7W: 2 RNs, 7PM–7AM. 4 qualified matches identified across 3 units.",
      },
      {
        id: "m2",
        author: "Sarah Mitchell",
        role: "Staffing Office Lead",
        timestamp: "2:22 PM",
        body: "Top match is Alex Chen from Float Pool — 92% match, no home-unit pressure. Sending to Priya for review first.",
      },
      {
        id: "m3",
        author: "Priya Nair",
        role: "Unit Manager, Orthopedics 7W",
        timestamp: "2:31 PM",
        body: "Alex has worked our unit before and is great — approving on our end. Also interested in Jordan Patel as a second RN if Post-Acute can release capacity tonight.",
      },
      {
        id: "m4",
        author: "ShiftBridge AI",
        role: "System",
        isSystem: true,
        timestamp: "2:33 PM",
        body: "Request sent to Jordan Patel's unit manager for sending-unit approval. Jordan's VTE prophylaxis competency is flagged for a refresher — not disqualifying, but worth noting before shift start.",
      },
      {
        id: "m5",
        author: "Jordan Patel",
        role: "Staff RN, Post-Acute / Rehab",
        timestamp: "2:47 PM",
        body: "Happy to help tonight if census stays stable after 9PM — will confirm with my unit manager by 6PM.",
      },
      {
        id: "m6",
        author: "Sarah Mitchell",
        role: "Staffing Office Lead",
        timestamp: "2:50 PM",
        body: "Sounds good. I'll keep Emily Roberts and Marcus Webb as backup matches in case either falls through.",
      },
    ],
  },
];

export function getThreadById(id: string): MessageThread | undefined {
  return messageThreads.find((t) => t.id === id);
}
