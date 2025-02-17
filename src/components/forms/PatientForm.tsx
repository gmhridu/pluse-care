"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "../ui/button";
import CustomFormField from "../CustomFormField";
import {Form} from "../ui/form";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    SELECT = "select",
    DATE_PICKER = "datePicker",
    SKELETON = "skeleton",
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
});

const PatientForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: ""
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // TODO: Submit form data to server
        console.log(values);
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default PatientForm;
