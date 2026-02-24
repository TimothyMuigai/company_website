import { Navbar } from "@/components/landingPage/navs/navBar";
import ControlCard from "@/components/trustCenter/ControlCard";
import DataCollectedCard from "@/components/trustCenter/DataCollectedCard";
import SectionHeader from "@/components/trustCenter/SectionHeader";
import SubprocessorItem from "@/components/trustCenter/SubProcessorItem";
import TrustHeroWithTabs from "@/components/trustCenter/TrustHero";
import TrustSideBar from "@/components/trustCenter/TrustSideBar";

export default function TrustCenter() {
  return (
    <>
      {/* <Navbar /> */}
      <TrustHeroWithTabs/>
      <div className="min-h-screen flex">
        <TrustSideBar />

        <main className="flex-1 p-10 space-y-10">
          {/* Controls Section */}
          <SectionHeader
            title="Controls"
            badge="Updated 2 minutes ago"
            link="View all"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlCard
              title="Infrastructure security"
              items={[
                "Unique production database authentication",
                "Encryption key access restricted",
                "Unique account authentication enforced",
              ]}
            />

            <ControlCard
              title="Organizational security"
              items={[
                "Asset disposal procedures utilized",
                "Production inventory maintained",
                "Anti-malware technology utilized",
              ]}
            />

            <ControlCard
              title="Product security"
              items={[
                "Data encryption utilized",
                "Control self-assessments conducted",
                "Penetration testing performed",
              ]}
            />

            <ControlCard
              title="Internal security procedures"
              items={[
                "Continuity & disaster recovery plans established",
                "Cybersecurity insurance maintained",
              ]}
            />

            <ControlCard
              title="Data and privacy"
              items={[
                "Data retention procedures established",
                "Customer data deleted upon leaving",
                "Data classification policy established",
              ]}
            />
          </div>

          {/* Data Collected */}
          <SectionHeader title="Data Collected" />

          <DataCollectedCard />

          {/* Subprocessors */}
          <SectionHeader title="Subprocessors" link="View all" />

          <div className="bg-white rounded-xl border p-6 space-y-4">
            <SubprocessorItem
              name="Amazon Web Services"
              description="Cloud provider"
            />
            <SubprocessorItem
              name="Intercom"
              description="Customer support"
            />
            <SubprocessorItem
              name="Google Workspace"
              description="Identity provider"
            />
            <SubprocessorItem
              name="Clerk"
              description="Authentication and authorization"
            />
          </div>
        </main>
      </div>
    </>
  );
}