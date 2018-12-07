package gov.games.forms.snakeNladder;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component("selectPlayersForm")
@Scope("prototype")
public class SelectPlayersForm {

	private String player1;
	private String player2;
	private String player3;
	private String player4;
	private String totalPlayers;
	private String boardName;

	private String errorString;

	public String getErrorString() {
		return errorString;
	}

	public void setErrorString(String errorString) {
		this.errorString = errorString;
	}

	public String getPlayer1() {
		return player1;
	}

	public void setPlayer1(String player1) {
		this.player1 = player1;
	}

	public String getPlayer2() {
		return player2;
	}

	public void setPlayer2(String player2) {
		this.player2 = player2;
	}

	public String getPlayer3() {
		return player3;
	}

	public void setPlayer3(String player3) {
		this.player3 = player3;
	}

	public String getPlayer4() {
		return player4;
	}

	public void setPlayer4(String player4) {
		this.player4 = player4;
	}

	public String getTotalPlayers() {
		return totalPlayers;
	}

	public void setTotalPlayers(String totalPlayers) {
		this.totalPlayers = totalPlayers;
	}

	public String getBoardName() {
		return boardName;
	}

	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}

}
