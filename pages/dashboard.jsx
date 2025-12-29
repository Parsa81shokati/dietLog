import HeaderStatus from "@/components/HeaderStatus";
import MacroGrid from "@/components/MacroGrid";
import MealsTimeline from "@/components/MealsTimeline";
import PrimaryActions from "@/components/PrimaryActions.js";
import SetupModal from "@/components/SetupModal";
import SmartMessage from "@/components/SmartMessage";
import { useAuth } from "@/hooks/useAuth";
import { getSmartMessage } from "@/lib/logic/smartMessages";
import { useEffect, useState } from "react";

function Dashboard() {
  const [openSetup, setOpenSetup] = useState(false);
  const [log, setLog] = useState(null);

  const { user, loading } = useAuth("/"); // redirect if not logged in

  async function fetchDailyLog() {
    const res = await fetch("/api/daily-log/today", {
      credentials: "include",
    });

    const data = await res.json();
    setLog(data);
  }

  useEffect(() => {
    fetchDailyLog();
  }, []);

  const message = log ? getSmartMessage(log, log.limits || {}) : null;

  console.log(log);
  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && user && (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
          <HeaderStatus
            date={log?.date}
            onOpenSetup={() => setOpenSetup(true)}
          />
          <MacroGrid log={log} />
          <PrimaryActions onSuccess={fetchDailyLog} />
          <MealsTimeline meals={log?.foods} />
          {message && <SmartMessage message={message} />}
          {openSetup && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <SetupModal onClose={() => setOpenSetup(false)} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
