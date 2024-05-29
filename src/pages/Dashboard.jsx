import PageHeader from "../components/PageHeader.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import testc from "../assets/images/testc.png";
import testd from "../assets/images/testd.png";
import testu from "../assets/images/testu.png";
import testt from "../assets/images/testt.png";
import testcv from "../assets/images/testcv.png";
import testa from "../assets/images/testa.png";

export default function Dashboard() {
    const breadcrumbs = [
        {label: 'Home', link: '/app/Dashboard'},
        {label: 'Dashboard', link: '/app/Dashboard'},
    ];
     return (
      <>
          <PageHeader title="Dashboard" breadcrumbs={breadcrumbs}/>
          <div className="flex justify-between items-center mr-16 mb-16 space-x-14">
              <DashboardCard img={testc} title="1000" subtitle="Vehicles" />
              <DashboardCard img={testd} title="500" subtitle="Drivers" />
              <DashboardCard img={testu} title="350" subtitle="Users" />
          </div>
          <div className="flex justify-between items-center mr-16 space-x-14">
              <DashboardCard img={testt} title="400" subtitle="Daily Trips" />
              <DashboardCard img={testcv} title="500" subtitle="Company Vehicles" />
              <DashboardCard img={testa} title="02" subtitle="Recent Accident" />
          </div>
      </>
     );
 }
