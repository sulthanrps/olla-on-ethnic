export default function Navbar(props) {
    return (
        <div className="bg-white text-black w-full h-[15vh] flex items-center justify-between px-8 shadow-md">
            <h1 className="text-3xl font-bold">{props.pageName}</h1>
            <div className="flex items-center gap-4">
                <div>
                    <p className="font-[500] text-sm">Sulthan</p>
                    <p className="text-gray-500 text-sm">Admin</p>
                </div>
                <img src="/drop.png" alt="drop btn" width={8.27} height={4} />
            </div>
        </div>
    )
}