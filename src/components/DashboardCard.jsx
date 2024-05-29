export default function DashboardCard(props) {
    return (
        <div className="w-1/3 h-64 bg-[#2c2c59] rounded-lg shadow-md p-4 flex flex-col">
            <h1 className="text-gray-300 text-5xl font-extrabold flex items-center">{props.title}</h1>
            <h1 className="text-gray-300 text-5xl font-normal flex items-center">{props.subtitle}</h1>
            <div className="flex flex-grow justify-end w-full items-end">
                <img src={props.img} alt="Vehicles" className="w-25 h-16"/>
            </div>
        </div>
    );
}
