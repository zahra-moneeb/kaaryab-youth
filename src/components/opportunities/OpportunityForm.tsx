"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Opportunity } from "@/types/opportunity";
import { useRouter } from "next/navigation";

import {
  opportunitySchema,
  OpportunityFormData,
} from "@/schemas/opportunitySchema";

import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import FormSelect from "@/components/ui/FormSelect";
import DynamicListField from "@/components/ui/DynamicListField";
import {
  Briefcase,
  Tag,
  FileText,
  ListChecks,
  Send,
  Loader2,
} from "lucide-react";

type OpportunityFormProps = {
  initialData?: Opportunity;
};

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-violet-400/10 dark:text-violet-300">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-slate-500 dark:text-zinc-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function OpportunityForm({ initialData }: OpportunityFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: initialData?.title ?? "",
      company: initialData?.company ?? "",
      logo: initialData?.logo ?? "",
      opportunityType: initialData?.opportunityType ?? "",
      category: initialData?.category ?? "",
      type: initialData?.type ?? "",
      location: initialData?.location ?? "",
      isRemote: initialData?.isRemote ?? false,
      salary: initialData?.salary ?? "",
      experience: initialData?.experience ?? "",
      description: initialData?.description ?? "",
      companyDescription: initialData?.companyDescription ?? "",
      deadline: initialData?.deadline ?? "",
      applyLink: initialData?.applyLink ?? "",
      requirements: initialData?.requirements ?? [],
      benefits: initialData?.benefits ?? [],
    },
  });

  const router = useRouter();

  const onSubmit = async (data: OpportunityFormData) => {
    try {
      let response;

      if (initialData) {
        response = await fetch(`/api/opportunities/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error(
          initialData ? "Failed to update opportunity" : "Failed to create opportunity"
        );
      }

      // const savedOpportunity = await response.json();

      // router.push(`/opportunities/${savedOpportunity.id}`);
      router.push("/opportunities");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Page header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-700 dark:text-violet-300">
          <span className="h-px w-6 bg-indigo-700 dark:bg-violet-300" />
          {initialData ? "Edit Opportunity" : "Post an Opportunity"}
          <span className="h-px w-6 bg-indigo-700 dark:bg-violet-300" />
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
          {initialData ? "Update Opportunity Details" : "Share a New Opportunity"}
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-slate-600 dark:text-zinc-400">
          Fill in the details below to {initialData ? "update" : "publish"} this
          opportunity for the community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, (errs) => {
          console.log("Validation Errors:", errs);
        })}
        className="mt-10 space-y-6"
      >
        {/* Basic Info */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SectionHeader
            icon={Briefcase}
            title="Basic Information"
            description="The core details of the opportunity"
          />

          <div className="mt-6 space-y-5">
            <FormInput
              label="Opportunity Title"
              name="title"
              register={register}
              error={errors.title}
              placeholder="Enter opportunity title"
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormInput
                label="Company Name"
                name="company"
                register={register}
                error={errors.company}
                placeholder="Enter company name"
                required
              />

              <FormInput
                label="Company Logo"
                name="logo"
                register={register}
                error={errors.logo}
                placeholder="/images/companies/logo.png"
              />
            </div>
          </div>
        </section>

        {/* Categorization & Location */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SectionHeader
            icon={Tag}
            title="Category & Location"
            description="Help people find this opportunity"
          />

          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <FormSelect
                label="Opportunity Type"
                name="opportunityType"
                register={register}
                error={errors.opportunityType}
                options={[
                  { label: "Internship", value: "Internship" },
                  { label: "Job", value: "Job" },
                  { label: "Scholarship", value: "Scholarship" },
                  { label: "Course", value: "Course" },
                ]}
                required
              />

              <FormSelect
                label="Category"
                name="category"
                register={register}
                error={errors.category}
                options={[
                  { label: "Technology", value: "Technology" },
                  { label: "Design", value: "Design" },
                  { label: "Business", value: "Business" },
                  { label: "Education", value: "Education" },
                ]}
                required
              />

              <FormSelect
                label="Type"
                name="type"
                register={register}
                error={errors.type}
                options={[
                  { label: "Internship", value: "Internship" },
                  { label: "Job", value: "Job" },
                  { label: "Scholarship", value: "Scholarship" },
                  { label: "Course", value: "Course" },
                ]}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormInput
                label="Location"
                name="location"
                register={register}
                error={errors.location}
                placeholder="Kabul, Afghanistan"
                required
              />

              <FormInput
                label="Salary"
                name="salary"
                register={register}
                error={errors.salary}
                placeholder="Unpaid / $500 per month"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
              <input
                id="isRemote"
                type="checkbox"
                {...register("isRemote")}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-white/20 dark:accent-violet-500 dark:focus:ring-violet-400/20"
              />
              <label
                htmlFor="isRemote"
                className="text-sm font-medium text-slate-700 dark:text-zinc-300"
              >
                This is a remote opportunity
              </label>
            </div>

            <FormSelect
              label="Experience Level"
              name="experience"
              register={register}
              error={errors.experience}
              options={[
                { label: "Beginner", value: "Beginner" },
                { label: "Intermediate", value: "Intermediate" },
                { label: "Advanced", value: "Advanced" },
              ]}
              required
            />
          </div>
        </section>

        {/* Descriptions */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SectionHeader
            icon={FileText}
            title="Descriptions"
            description="Tell applicants what this opportunity involves"
          />

          <div className="mt-6 space-y-5">
            <FormTextarea
              label="Opportunity Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Describe this opportunity..."
              rows={6}
              required
            />

            <FormTextarea
              label="Company Description"
              name="companyDescription"
              register={register}
              error={errors.companyDescription}
              placeholder="Describe the company or organization..."
              rows={5}
              required
            />
          </div>
        </section>

        {/* Requirements & Benefits */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SectionHeader
            icon={ListChecks}
            title="Requirements & Benefits"
            description="What applicants need, and what they'll get"
          />

          <div className="mt-6 space-y-6">
            <DynamicListField
              label="Requirements"
              name="requirements"
              control={control}
              register={register}
              errors={errors}
            />

            <DynamicListField
              label="Benefits"
              name="benefits"
              control={control}
              register={register}
              errors={errors}
            />
          </div>
        </section>

        {/* Application Details */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <SectionHeader
            icon={Send}
            title="Application Details"
            description="How and when people can apply"
          />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <FormInput
              label="Application Deadline"
              name="deadline"
              type="date"
              register={register}
              error={errors.deadline}
              required
            />

            <FormInput
              label="Application Link"
              name="applyLink"
              register={register}
              error={errors.applyLink}
              placeholder="https://example.com/apply"
              required
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-98 disabled:cursor-not-allowed disabled:opacity-60 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-400 dark:hover:to-purple-400"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting
              ? initialData
                ? "Updating..."
                : "Creating..."
              : initialData
              ? "Update Opportunity"
              : "Create Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
}