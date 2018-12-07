package gov.games.utils.snakeNladder;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class SnakeAndLadderMovement {

	public static final int HOME_NUMBER = 100;

	public static int generateSnakeAndLadderNumber(String currentPosition, String diceNumber, String boardName) {

		int requiredNum = Integer.parseInt(currentPosition) + Integer.parseInt(diceNumber);
		if (requiredNum == HOME_NUMBER) {
			return HOME_NUMBER;
		}
		if (requiredNum > HOME_NUMBER) {
			return Integer.parseInt(currentPosition);
		}
		Map<String, List<int[]>> arrangementsMap = SnakeAndLadderArrangements.getStaticarrangementsMap();

		for (Map.Entry<String, List<int[]>> entry : arrangementsMap.entrySet()) {
			if (entry.getKey().equalsIgnoreCase(boardName)) {
				List<int[]> arrangementList = entry.getValue();
				for (int j = 0; j < arrangementList.size(); j++) {
					int[] comboArr = arrangementList.get(j);
					System.out.println(comboArr[0] + ", " + comboArr[1]);
					if (requiredNum == comboArr[0]) {
						return comboArr[1];
					}
				}
			}
		}
		return requiredNum;
	}

}
