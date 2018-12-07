package gov.games.utils.snakeNladder;

import java.util.List;
import java.util.Map;
import java.util.Random;

public class SnakeAndLadderDemo {

	public static void playGame(String player, String boardName) throws Exception {

		boolean startGame = false;
		int currentPos = 0;
		while (true) {
			System.out.println("Throw Dice..");
			Thread.sleep(2000);
			int diceNum = PlayingSnakeAndLadder.throwDice();
			System.out.println("It is " + diceNum);
			Thread.sleep(2000);
			if (diceNum == 1 && !startGame) {
				startGame = true;
				System.out.println("YES!!! Your Game started..");
				Thread.sleep(2000);
			} else if (!startGame) {
				System.out.println("Better luck next time..");
				Thread.sleep(2000);
				continue;
			}
			if ((currentPos + diceNum) > 100) {
				System.out.println("Hey! Your target is just 100..");
			} else {
				System.out.println("Your current position is " + (currentPos + diceNum));
			}
			Thread.sleep(2000);
			if (startGame) {
				int requiredNum = PlayingSnakeAndLadder.getDiceMovement(String.valueOf(currentPos),
						String.valueOf(diceNum), boardName);
				if (currentPos > requiredNum) {
					System.out.println("Oh! NO... You have got bitten by snake..");
					Thread.sleep(2000);
					System.out.println("Your current position is " + requiredNum);
					Thread.sleep(2000);
				} else if (currentPos + diceNum < requiredNum) {
					System.out.println("Yeah! You have got ladder..");
					Thread.sleep(2000);
					System.out.println("Your current position is " + requiredNum);
					Thread.sleep(2000);
				}
				currentPos = requiredNum;
			}
			if (currentPos == SnakeAndLadderMovement.HOME_NUMBER) {
				System.out.println("Yeah!! YOU WON..");
				Thread.sleep(1000);
				break;
			}
		}
	}

	public static void main(String[] args) throws Exception {
		Map<String, List<int[]>> arrangementsMap = SnakeAndLadderArrangements.getArrangements();
		Random intialRandom = new Random();
		int initial = intialRandom.nextInt(arrangementsMap.size() - 1) + 1;
		String boardName = "";
		for (Map.Entry<String, List<int[]>> entry : arrangementsMap.entrySet()) {
			String key = entry.getKey();
			if (key.contains(String.valueOf(initial))) {
				boardName = key;
			}
		}
		String player1 = "Player1";
		System.out.println("Start your Game......");
		Thread.sleep(3000);
		playGame(player1, boardName);
	}
}
