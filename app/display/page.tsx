import TypeForm from "@/components/form/typeform";
import { loginSchema } from "@/lib/form";

export default function() {
    return (
        <main>
            <TypeForm 
                identifier="display"
                fields={loginSchema}
                onSubmit={async () => { console.log('Test') }}
            />
        </main>
    )
}