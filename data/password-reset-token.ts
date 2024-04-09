import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = db.passwordResetToken.findUnique({
			where: {token}
		})
		return passwordResetToken;
	} catch {
		return null;
	}
  
}

export const getPasswordResetTokenByEmail = async (token: string) => {
	try {
		const passwordResetToken = db.passwordResetToken.findFirst({
			where: {token}
		})
		return passwordResetToken;
	} catch {
		return null;
	}
  
}

