import { notFound } from "next/navigation";

export default function CatchAllUnknownRoutes() {
  notFound();
}
