
import DetailHero from "@/components/opportunity-details/DetailHero";
import InfoCards from "@/components/opportunity-details/InfoCards";
import Requirements from "@/components/opportunity-details/Requirements";
import { Opportunity } from "@/types/opportunity";
import Benefits from "@/components/opportunity-details/Benefits";
import CompanyInfo from "@/components/opportunity-details/CompanyInfo";
import ApplyCard from "@/components/opportunity-details/ApplyCard";
import Description from "@/components/opportunity-details/Description";
import opportunities from "@/data/opportunities.json";


function getOpportunity(id: string) {
  return (opportunities as Opportunity[]).find(
    (item) => item.id === Number(id)
  );
}


export default async function OpportunityDetailsPage({
   params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const opportunity = await getOpportunity(id);


  if (!opportunity) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">
          Opportunity Not Found
        </h1>
      </div>
    )
  }


return (
  <section className="mx-auto max-w-7xl space-y-8 px-6 py-12">

    <DetailHero 
      opportunity={opportunity}
    />


    <InfoCards
      opportunity={opportunity}
    />


    <div
      className="
      grid
      gap-8
      lg:grid-cols-3
      "
    >


      {/* Main Content */}

      <div
        className="
        space-y-8
        lg:col-span-2
        "
      >

        <Description
          opportunity={opportunity}
        />


        <Requirements
          opportunity={opportunity}
        />


        <Benefits
          opportunity={opportunity}
        />


        <CompanyInfo
          opportunity={opportunity}
        />


      </div>



      {/* Sidebar */}

      <aside
        className="
        lg:col-span-1
        "
      >

        <div
          className="
          sticky
          top-24
          "
        >

          <ApplyCard
            opportunity={opportunity}
          />

        </div>


      </aside>


    </div>


  </section>
);
}