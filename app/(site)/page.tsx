import AuthForm from "./components/AuthForm";

export default function Home() {
    return (

        <div
            className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100"
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <p className="font-extrabold text-3xl text-center text-gray-600">Quicky.</p>

            </div>
            <AuthForm />
        </div>
    );
}
