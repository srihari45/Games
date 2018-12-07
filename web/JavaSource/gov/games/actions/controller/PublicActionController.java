package gov.games.actions.controller;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import gov.games.forms.snakeNladder.SelectPlayersForm;
import gov.games.utils.UIFormConstants;
import gov.games.utils.Utils;
import gov.games.utils.snakeNladder.PlayingSnakeAndLadder;
import gov.games.utils.snakeNladder.SnakeAndLadderArrangements;

@Controller
public class PublicActionController {

	private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired
	@Qualifier("selectPlayersForm")
	private ObjectFactory<SelectPlayersForm> selectPlayersFormFactory;

	@RequestMapping(value = "/pub/showingSnakeAndLadderHome.html")
	public String showHome(HttpServletRequest request, ModelMap model) {
		log.debug("Showing home..");
		model.addAttribute(UIFormConstants.FORM_SELECT_PLAYERS, selectPlayersFormFactory.getObject());
		return UIFormConstants.TILES_SHOW_HOME;
	}

	@RequestMapping(value = "/snl/playGame.html")
	public String playSNLGame(
			@ModelAttribute(UIFormConstants.FORM_SELECT_PLAYERS) @Validated SelectPlayersForm selectPlayersForm,
			HttpServletRequest request, HttpServletResponse response, BindingResult result, ModelMap modal) {

		String boardName = getArrangmentName();
		log.debug("Board Name : " + boardName);

		if (Utils.isNull(selectPlayersForm.getPlayer1()) || Utils.isNull(selectPlayersForm.getPlayer2())) {
			result.rejectValue("errorString", UIFormConstants.ERROR_MINIMUM_TWO_PLAYERS_REQUIRED);
			return UIFormConstants.TILES_SHOW_HOME;
		}

		selectPlayersForm.setBoardName(boardName);
		request.setAttribute("player1", selectPlayersForm.getPlayer1());
		request.setAttribute("player2", selectPlayersForm.getPlayer2());

		selectPlayersForm.setTotalPlayers("2");
		if (!Utils.isNull(selectPlayersForm.getPlayer3())) {
			request.setAttribute("player3", selectPlayersForm.getPlayer3());
			selectPlayersForm.setTotalPlayers("3");
		}
		if (!Utils.isNull(selectPlayersForm.getPlayer4())) {
			request.setAttribute("player4", selectPlayersForm.getPlayer4());
			selectPlayersForm.setTotalPlayers("4");
		}

		modal.addAttribute(UIFormConstants.FORM_SELECT_PLAYERS, selectPlayersForm);
		return UIFormConstants.TILES_PLAYING_GAME;
	}

	private String getArrangmentName() {

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
		return boardName;
	}

	@RequestMapping(value = "/snl/diceMovement.html")
	public String diceMovement(HttpServletRequest request, HttpServletResponse response) throws Exception {

		PrintWriter out = response.getWriter();
		String currentPosition = request.getParameter("currentPosition");
		String diceNum = request.getParameter("diceNumber");
		String boardName = request.getParameter("boardName");
		if (currentPosition.trim() == "0" && diceNum.trim() != "1") {
			out.write("It is " + diceNum + "#" + currentPosition);
			return null;
		}

		String msg = "You just had " + diceNum + " steps ahead..";
		if (Integer.parseInt(currentPosition) + Integer.parseInt(diceNum) == 100) {
			msg = "YOU WON.!!";
			out.write(msg + "#" + (Integer.parseInt(currentPosition) + Integer.parseInt(diceNum)));
			return null;
		}
		if (Integer.parseInt(currentPosition) + Integer.parseInt(diceNum) > 100) {
			msg = "Hey! Your target was just 100 only..";
			out.write(msg + "#" + currentPosition);
			return null;
		}
		int diceMovement = 0;
		try {
			diceMovement = PlayingSnakeAndLadder.getDiceMovement(currentPosition, diceNum, boardName);
		} catch (Exception e) {
			log.error("Something went wrong", e);
		}

		if (Integer.parseInt(currentPosition) > diceMovement) {
			msg = "Oh! NO... You have got bitten by snake..";
		} else if (Integer.parseInt(currentPosition) + Integer.parseInt(diceNum) < diceMovement) {
			msg = "Yeah! You have got ladder..";
		}

		out.write(msg + "#" + diceMovement);
		return null;
	}
}
