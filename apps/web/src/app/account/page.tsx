import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/util";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  console.log(params);
  return <div>{params.id}</div>;
}
