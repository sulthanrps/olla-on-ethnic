const imageUrl = "./auth-picture.png";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
                        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
                    </div>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative flex-1">
                <img
                    className="absolute inset-0 h-[100%] w-full object-cover"
                    src={imageUrl}
                    alt="Fashion display"
                />
            </div>
        </div>
    );
};

export default AuthLayout;