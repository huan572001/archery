import {
  _decorator,
  Animation,
  AudioSource,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
  RigidBody2D,
  UIOpacity,
  Vec2,
  Vec3,
} from "cc";
import { ArrowView } from "../view/ArrowView";
import { GameModal } from "../model/GameModel";
import { GameView } from "../view/GameView";
const { ccclass, property } = _decorator;

@ccclass("ArrowController")
export class ArrowController extends Component {
  @property({ type: Node })
  private board: Node;
  @property({ type: Node })
  private arrow: Node;
  @property({ type: Node })
  private bow: Node;
  @property({ type: AudioSource })
  private hitAudio: AudioSource;
  @property({ type: RigidBody2D })
  private arrowRigid: RigidBody2D;
  @property({ type: ArrowView })
  private arrowView: ArrowView;
  @property({ type: GameView })
  private gameView: GameView;
  @property({ type: GameModal })
  private gameModal: GameModal;
  @property({ type: Animation })
  private arrowAnim: Animation;
  @property({ type: UIOpacity })
  private arrowOpacity: UIOpacity;
  private countPoint: number = 0;
  private startMove: number = -1;
  protected start(): void {
    this.gameModal.arrowCollider.on(
      Contact2DType.BEGIN_CONTACT,
      this.onBeginContact,
      this
    );
  }
  protected update(dt: number): void {
    if (this.countPoint > 500 && this.gameModal.statusBoardMove) {
      this.moveBoardX(dt);
    } else if (this.countPoint > 1000 && this.gameModal.statusBoardMove) {
      this.moveBoardY(dt);
    }
    if (this.arrow.position.y > 500 || this.arrow.position.x > 800) {
      this.onResetArrow();
      this.arrowView.onArrowDefault();
      this.gameModal.statusGame = true;
      this.gameModal.arrowNumber -= 1;
      this.gameView.setArrowPrefab(false);
    }
  }
  private onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.onResetArrow();
    this.arrowView.onArrowCut();
    let arrowXY = this.arrow.position;
    let rotation = this.bow.angle * (Math.PI / 180);
    let x = arrowXY.x * Math.cos(rotation) - arrowXY.y * Math.sin(rotation);
    let y = arrowXY.x * Math.sin(rotation) + arrowXY.y * Math.cos(rotation);
    let rotationArrow = (this.bow.angle + this.arrow.angle) * (Math.PI / 180);
    let h = Math.abs(Math.sin(rotationArrow) * 56);
    let location = this.board.position.y - (y + this.bow.position.y);
    if (location > 0) {
      location = location - h - 1;
    } else {
      location = location + h + 1;
    }
    let point = 50 - 10 * Math.abs(Math.floor(location / 12));
    if (location < 12 && location > -12) {
      point = 50;
    }

    if (point > 0) {
      this.hitAudio.play();
      this.countPoint += point;
      this.arrowView.onPointView(point, this.countPoint);
      if (point === 50) {
        this.gameModal.arrowNumber += 1;
        this.gameView.setArrowPrefab(true);
      } else {
        this.gameModal.arrowNumber -= 1;
        this.gameView.setArrowPrefab(false);
      }
      this.gameView.setPoint(point);
    } else {
      this.gameModal.arrowNumber -= 1;
      this.gameView.setArrowPrefab(false);
    }

    this.arrowAnim.play();
    this.gameModal.statusBoardMove = false;
    this.scheduleOnce(() => {
      this.arrowView.onArrowDefault();
      this.gameModal.statusBoardMove = true;
      this.gameModal.statusGame = true;
      this.arrowView.offPointView();
      this.arrowOpacity.opacity = 255;
      if (point > 0) {
        this.gameView.randomBoard();
        this.gameModal.boardCollider.apply();
      }
    }, 1);
  }
  private moveBoardX(dt: number): void {
    let x = 100 * dt;
    if (this.board.position.x > 450) {
      this.startMove = -1;
    } else if (this.board.position.x < 100) {
      this.startMove = 1;
    }

    this.board.setPosition(
      this.board.position.x + this.startMove * x,
      this.board.position.y
    );
    this.gameModal.boardCollider.apply();
  }
  private moveBoardY(dt: number): void {
    let y = 100 * dt;
    if (this.board.position.y > 250) {
      this.startMove = -1;
    } else if (this.board.position.y < -200) {
      this.startMove = 1;
    }

    this.board.setPosition(
      this.board.position.x,
      this.board.position.y + this.startMove * y
    );
    this.gameModal.boardCollider.apply();
  }
  public onShootArrows(x?: number, y?: number) {
    this.arrowRigid.angularVelocity = -0.5;
    this.arrowRigid.linearVelocity = new Vec2(x * 2, y * 2);
    this.arrowRigid.gravityScale = 1;
  }
  public onResetArrow() {
    this.arrowRigid.angularVelocity = 0;
    this.arrowRigid.linearVelocity = new Vec2(0, 0);
    this.arrowRigid.gravityScale = 0;
  }
}
