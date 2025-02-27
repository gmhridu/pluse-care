"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import CustomFormField from "../CustomFormField";
import {Form} from "../ui/form";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {createUser} from "@/lib/actions/patient.actions";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    SELECT = "select",
    DATE_PICKER = "datePicker",
    SKELETON = "skeleton",
}


const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    });

    const onSubmit = async ({name, email, phone}: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true)

        try {
            const userData = {name, email, phone};

            const user = await createUser(userData);
            
            if (user) {
                router.push(`/patients/${user.$id}/register`)
            }
        } catch (error) {
            console.log(error)

        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    control={form.control}
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="johndoe@plusecare.pro"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                    control={form.control}
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    name="phone"
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                    control={form.control}
                />
                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    );
};

export default PatientForm;
