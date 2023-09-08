import {
  _decorator,
  AudioSource,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventMouse,
  EventTouch,
  find,
  input,
  Input,
  IPhysics2DContact,
  Node,
  Vec2,
} from "cc";
import { GameView } from "../view/GameView";
import { ArrowController } from "./ArrowController";
import { GameModal } from "../model/GameModel";
import { DotsController } from "./DotsController";
import { Store } from "../Store";
import { game, gameOver, home } from "../constan";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Node })
  private bow: Node;
  @property({ type: Node })
  private popupPause: Node;
  @property({ type: GameView })
  private gameView: GameView;
  @property({ type: ArrowController })
  private arrow: ArrowController;
  @property({ type: GameModal })
  private gameModal: GameModal;
  @property({ type: DotsController })
  private dots: DotsController;
  @property({ type: AudioSource })
  private shootAudio: AudioSource;
  @property({ type: AudioSource })
  private btnAudio: AudioSource;
  @property({ type: AudioSource })
  private hitAudio: AudioSource;
  @property({ type: AudioSource })
  private gameOverAudio: AudioSource;
  private locationStart: Vec2;
  private statusMove: boolean = false;
  private velocityX: number = null;
  private velocityY: number = null;
  start() {
    let store = find("store");
    if (store.getComponent(Store).statusAudio) {
      this.onAudio();
    } else {
      this.offAudio();
    }
    this.gameView.intitBowString();
    this.onEventTouch();
    this.gameView.innitArrowPrefab(this.gameModal.arrowNumber);
  }
  update(deltaTime: number) {
    this.checkGameOver();
  }
  private onEventTouch(): void {
    this.bow.on(Node.EventType.TOUCH_START, this.onClickStart, this);
    this.bow.on(Node.EventType.TOUCH_MOVE, this.onClickMove, this);
    input.on(Input.EventType.MOUSE_UP, this.onClickEnd, this);
  }

  private onClickStart(event: EventTouch) {
    if (this.gameModal.statusGame) {
      this.scheduleOnce(() => (this.locationStart = event.getLocation()), 0.1);
    }
  }
  private onClickMove(event: EventTouch) {
    if (this.gameModal.statusGame) {
      if (this.locationStart) {
        this.statusMove = true;
        let lo = event.getLocation();
        let withT = this.locationStart.x - lo.x;
        let height = this.locationStart.y - lo.y;
        let Tan = Math.abs(withT / height);
        let Rotation = 90 - (Math.atan(Tan) * 180) / Math.PI;
        if (Rotation >= 45) {
          Rotation = 45;
        }
        if (height < 0) {
          Rotation = -Rotation;
        }
        this.bow.angle = Rotation;
        if (withT > 25) {
          withT = 25;
        } else if (withT < 0) {
          withT = 0;
        }
        this.gameView.intitBowString(withT);
        this.velocityX = withT * Math.cos(this.degreesToRadians(Rotation));
        this.velocityY = withT * Math.sin(this.degreesToRadians(Rotation));
        this.dots.updateDots(new Vec2(this.velocityX * 8, this.velocityY / 2));
      }
    }
  }
  private onClickEnd(event: EventMouse) {
    if (this.gameModal.statusGame) {
      if (this.statusMove) {
        this.arrow.onShootArrows(this.velocityX, this.velocityY);
        this.gameView.intitBowString();
        this.gameModal.statusGame = false;
        this.statusMove = false;
        this.locationStart = null;
        this.shootAudio.play();
      }
    }
  }
  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  private checkGameOver(): void {
    if (this.gameModal.arrowNumber === 0) {
      this.gameModal.statusGame = false;
      this.gameOverAudio.play();
      this.gameView.gameOver();
      this.gameModal.arrowNumber = -1;
    }
  }
  private onpauseGame(): void {
    this.popupPause.active = true;
    this.gameModal.statusBoardMove = false;
  }
  private offpauseGame(): void {
    this.popupPause.active = false;
    this.gameModal.statusBoardMove = true;
  }
  private onAudioBtn(): void {
    this.btnAudio.play();
  }
  private homeGame(): void {
    director.addPersistRootNode(find("store"));
    director.loadScene(home);
  }
  private resetGame(): void {
    director.addPersistRootNode(find("store"));
    director.loadScene(game);
  }
  private offAudio(): void {
    this.shootAudio.volume = 0;
    this.hitAudio.volume = 0;
    this.gameOverAudio.volume = 0;
    this.btnAudio.volume = 0;
  }
  private onAudio(): void {
    this.shootAudio.volume = 1;
    this.hitAudio.volume = 1;
    this.gameOverAudio.volume = 1;
    this.btnAudio.volume = 1;
  }
}
