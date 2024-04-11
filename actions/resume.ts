"use server";
interface Data{
	name: String | undefined,
	surname: String | undefined,
	address: String | undefined,
	dateOfBirth: String | undefined,
	phone: String | undefined,
	email: String | undefined,
	linkedin: String | undefined,
	github: String | undefined,
	dribble: String | undefined,
	website: String | undefined,
	bio: String | undefined,
	desiredJob: String | undefined,
	ral: String | undefined,
	experience: {
        years: string;
        exps: string;
    }[] | undefined;
    education: {
        eyears: string;
        edu: string;
    }[] | undefined;
	skillss: String[] | undefined;
	softSkillss: String[] | undefined;

}
export const resume = async (values: Data) => {
  console.log(values)
}
