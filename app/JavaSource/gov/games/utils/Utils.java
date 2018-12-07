package gov.games.utils;

public class Utils {

	public static boolean isNull(String str) {

		if (str == null || str.length() == 0 || str.trim().equalsIgnoreCase("null")) {
			return true;
		}
		return false;
	}
}
