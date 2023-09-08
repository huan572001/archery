import {
  _decorator,
  Component,
  Label,
  Node,
  Sprite,
  SpriteFrame,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ArrowView")
export class ArrowView extends Component {
  @property({ type: Node })
  private arrow: Node;
  @property({ type: Sprite })
  private arrowSprite: Sprite;
  @property({ type: [SpriteFrame] })
  private listIMGArrow: SpriteFrame[] = [];
  @property({ type: Label })
  private pointLabel: Label;
  @property({ type: Label })
  private countPointLable: Label;
  @property({ type: Node })
  private point: Node;
  @property({ type: Node })
  private board: Node;

  public onPointView(point: number, countPoint: number): void {
    if (point > 0) {
      this.point.setPosition(this.board.position.x - 60, this.board.position.y);
      this.point.active = true;
      this.pointLabel.string = `+${point}`;
      this.setCountPoint(countPoint);
    }
  }
  public offPointView(): void {
    this.point.active = false;
  }
  public setCountPoint(point: number) {
    this.countPointLable.string = `${point}`;
  }
  public onArrowCut(): void {
    this.arrowSprite.spriteFrame = this.listIMGArrow[1];
  }
  public onArrowDefault(): void {
    this.arrowSprite.spriteFrame = this.listIMGArrow[0];
    this.arrow.angle = 0;
    this.arrow.setPosition(34, 0);
  }
  public setpositionArrow(x: number): void {
    this.arrow.setPosition(x ? 34 - x : 34, this.arrow.position.y);
  }
}
