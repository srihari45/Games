package gov.games.utils.snakeNladder;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class PlayingSnakeAndLadder {

	public static int throwDice() {

		Random random = new Random();
		int number = random.nextInt(6) + 1;
		return number;
	}

	public static int getDiceMovement(String currentPosition, String diceNumber, String boardName) {

		return SnakeAndLadderMovement.generateSnakeAndLadderNumber(currentPosition, diceNumber, boardName);
	}

	public static void main(String[] args) {

	}

}
