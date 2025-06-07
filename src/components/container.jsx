export default function Container({ children }) {
    return (
        <div className="w-full p-4 bg-white rounded-sm">
            {children}
        </div>
    );
}