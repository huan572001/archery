import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  UITransform,
  Vec2,
} from "cc";
import { GameModal } from "../model/GameModel";
const { ccclass, property } = _decorator;

@ccclass("DotsController")
export class DotsController extends Component {
  @property({ type: Node })
  private arrow: Node;
  @property({ type: Node })
  private dots: Node;
  @property({ type: Prefab })
  private dot: Prefab;
  @property({ type: GameModal })
  private gameModal: GameModal;
  private dotsList: Node[] = [];
  private listMove: Vec2[] = [];
  protected start(): void {
    for (let i = 0; i < this.gameModal.dotsNumber; i++) {
      let dotList = instantiate(this.dot);
      this.dots.addChild(dotList);
      this.dotsList.push(dotList);
    }
  }
  public updateDots(initialVelocity: Vec2): void {
    this.listMove = [];
    for (let i = 0; i < this.gameModal.dotsNumber; i += 0.05) {
      const x = this.arrow.position.x - 56 + initialVelocity.x * i;
      const y =
        this.arrow.position.y + initialVelocity.y * i - 0.5 * 10 * i * i;
      this.listMove.push(new Vec2(x, y));
    }

    for (let i = 0; i < this.gameModal.dotsNumber; i++) {
      this.dotsList[i].setPosition(
        this.listMove[i * 4].x,
        this.listMove[i * 4].y
      );
    }
  }
}
