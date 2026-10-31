import { notFound } from "next/navigation";
import PieceForm from "@/components/PieceForm";
import type { Piece } from "@/lib/pieces";
import { createServerSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditPiecePage({ params }: PageProps<"/admin/edit/[id]">) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("pieces").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div>
      <h1 className="text-3xl text-navy mb-8">Edit piece</h1>
      <PieceForm piece={data as Piece} />
    </div>
  );
}
