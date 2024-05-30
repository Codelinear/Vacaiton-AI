import { v4 as uuidv4 } from "uuid";
import Download from "@/components/ui/icons/download";
import Like from "@/components/ui/icons/like";
import Dislike from "@/components/ui/icons/dislike";

export const reasons = [
  {
    id: uuidv4(),
    reason: "A cultural experience",
  },
  {
    id: uuidv4(),
    reason: "An adventurous trip",
  },
  {
    id: uuidv4(),
    reason: "Solo travel",
  },
  {
    id: uuidv4(),
    reason: "A romantic getaway",
  },
  {
    id: uuidv4(),
    reason: "A family vacation",
  },
  {
    id: uuidv4(),
    reason: "Explore places",
  },
];

export const responseItems = [
  {
    id: uuidv4(),
    text: "Download this",
    icon: <Download />,
  },
  {
    id: uuidv4(),
    text: "I like this",
    icon: <Like fill="none" />,
  },
  {
    id: uuidv4(),
    text: "I dislike this",
    icon: <Dislike fill="none" />,
  },
];
