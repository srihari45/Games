package gov.games.utils.snakeNladder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeSet;

public class SnakeAndLadderArrangements {

	public static final int snakeAndLadderCombo = 14;
	public static final int totalArrangements = 5;
	public static Map<String, List<int[]>> staticArrangementsMap = new HashMap<>();

	public static Map<String, List<int[]>> getStaticarrangementsMap() {
		return staticArrangementsMap;
	}

	public static void setStaticarrangementsMap(Map<String, List<int[]>> list) {
		staticArrangementsMap = list;
	}

	public static List<int[]> generateArrangements() {

		List<int[]> arrangementList = new ArrayList<>();
		Set<Integer> randomSet = new TreeSet<>();
		Random random = new Random();

		while (arrangementList.size() < snakeAndLadderCombo) {

			int startNumber = random.nextInt(98) + 1;
			int endNumber = random.nextInt(98) + 1;

			if (!randomSet.contains(startNumber) && !randomSet.contains(endNumber) && startNumber != endNumber
					&& Math.abs(startNumber - endNumber) >= 10 && startNumber != 1 && endNumber != 1) {

				int[] arrangementArr = new int[2];
				arrangementArr[0] = startNumber;
				arrangementArr[1] = endNumber;
				arrangementList.add(arrangementArr);
			}
		}

		return arrangementList;
	}

	public static Map<String, List<int[]>> getArrangements() {

		List<int[]> arrangementList = new ArrayList<>();
		Map<String, List<int[]>> arrangementMap = new HashMap<>();

		while (arrangementMap.size() < totalArrangements) {
			arrangementList = generateArrangements();
			arrangementMap.put("Arrangement" + String.valueOf(arrangementMap.size() + 1), arrangementList);
		}
		setStaticarrangementsMap(arrangementMap);
		return getStaticarrangementsMap();
	}

	public static void main(String[] args) {

		Map<String, List<int[]>> map = new HashMap<>();
		System.out.println("Before Combo Size : " + map.size());
		map = getArrangements();
		System.out.println("After Combo Size : " + map.size());
		for (Map.Entry<String, List<int[]>> entry : map.entrySet()) {
			String key = entry.getKey();
			System.out.println(key);
			List<int[]> arrList = map.get(key);
			for (int j = 0; j < arrList.size(); j++) {
				System.out.println(Arrays.toString(arrList.get(j)));
			}
			System.out.println("==============================");
		}

	}

}
