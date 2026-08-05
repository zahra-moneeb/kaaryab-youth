import OpportunityForm from "@/components/opportunities/OpportunityForm";
import { Opportunity } from "@/types/opportunity";
import opportunities from "@/data/opportunities.json";


function getOpportunity(id: string) {
  return (opportunities as Opportunity[]).find(
    (item) => item.id === Number(id)
  );
}

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const opportunity =
    await getOpportunity(id);

  if (!opportunity) {

    return (
      <h1 className="text-center py-20 text-3xl font-bold">
        Opportunity Not Found
      </h1>
    );

  }

  return (

    <main className="mx-auto max-w-5xl px-6 py-12">

      <h1 className="mb-8 text-3xl font-bold">

        Edit Opportunity

      </h1>

      <OpportunityForm
        initialData={opportunity}
      />

    </main>

  );

}