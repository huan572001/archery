import {
  _decorator,
  Component,
  director,
  Graphics,
  instantiate,
  Label,
  Node,
  Prefab,
  random,
  Size,
  UITransform,
} from "cc";
import { ArrowView } from "./ArrowView";
import { gameOver } from "../constan";
const { ccclass, property } = _decorator;

@ccclass("GameView")
export class GameView extends Component {
  @property({ type: Node })
  private board: Node;
  @property({ type: Graphics })
  private bowStringTop: Graphics;
  @property({ type: Graphics })
  private bowStringButon: Graphics;
  @property({ type: ArrowView })
  private arrowView: ArrowView;
  @property({ type: Prefab })
  private arrowPrefab: Prefab;
  @property({ type: Node })
  private arrowNumberCenter: Node;
  @property({ type: Node })
  private popupGameOver: Node;
  @property({ type: Node })
  private gmaeOver: Node;
  @property({ type: Label })
  private point: Label;
  private pointCount: number = 0;
  private listArrowPrefab: Node[] = [];

  public innitArrowPrefab(number: number): void {
    for (let i = 0; i < number; i++) {
      let newNode = instantiate(this.arrowPrefab);
      this.arrowNumberCenter.addChild(newNode);
      this.listArrowPrefab.push(newNode);
      this.listArrowPrefab[i].setPosition(
        (i % 25) * 29,
        this.listArrowPrefab[i].position.y - 29 * Math.floor(i / 25),
        0
      );
    }
  }
  public setArrowPrefab(status: boolean): void {
    if (status) {
      let newNode = instantiate(this.arrowPrefab);
      let vt = Math.floor(this.listArrowPrefab.length / 25);
      this.arrowNumberCenter.addChild(newNode);
      this.listArrowPrefab.push(newNode);
      this.listArrowPrefab[this.listArrowPrefab.length - 1].setPosition(
        ((this.listArrowPrefab.length - 1) % 25) * 29,
        this.listArrowPrefab[this.listArrowPrefab.length - 1].position.y -
          29 * vt,
        0
      );
    } else {
      this.listArrowPrefab[this.listArrowPrefab.length - 1].destroy();
      this.listArrowPrefab.pop();
    }
  }
  public intitBowString(x?: number): void {
    this.bowStringTop.clear();
    this.bowStringButon.clear();
    if (x === undefined || x < 0) {
      x = 0;
    }
    this.bowStringTop.moveTo(0, 27.5);
    this.bowStringTop.lineTo(-x, -27.5);
    this.bowStringTop.stroke();
    this.bowStringButon.moveTo(-x, 27.5);
    this.bowStringButon.lineTo(0, -27.5);
    this.bowStringButon.stroke();
    this.arrowView.setpositionArrow(x);
  }
  public resetArrow(): void {
    this.arrowView.onArrowDefault();
  }
  public randomBoard(): void {
    let x = Math.floor(Math.random() * 350) + 100;
    let y = Math.floor(Math.random() * 200) - 150;
    this.board.setPosition(x, y);
  }
  public setPoint(num: number): void {
    this.pointCount += num;
    this.point.string = `${this.pointCount}`;
  }
  public gameOver(): void {
    this.gmaeOver.setPosition(0, 0);
    this.scheduleOnce(() => {
      this.popupGameOver.active = true;
    }, 1);
  }
}
