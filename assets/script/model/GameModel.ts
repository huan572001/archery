import {
  _decorator,
  CCBoolean,
  CCFloat,
  CCInteger,
  Collider2D,
  Component,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameModal")
export class GameModal extends Component {
  @property({ type: CCFloat })
  private DotSpacing: number;
  @property({ type: CCInteger })
  private DotsNumber: number;
  @property({ type: CCBoolean })
  private StatusGame: boolean;
  @property({ type: CCBoolean })
  private StatusBoardMove: boolean;
  @property({ type: CCBoolean })
  private Audio: boolean;
  @property({ type: CCInteger })
  private ArrowNumber: number;
  @property({ type: Collider2D })
  private ArrowCollider: Collider2D;
  @property({ type: Collider2D })
  private BoardCollider: Collider2D;
  public get audio(): boolean {
    return this.Audio;
  }
  public set audio(value: boolean) {
    this.Audio = value;
  }
  public get statusBoardMove(): boolean {
    return this.StatusBoardMove;
  }
  public set statusBoardMove(value: boolean) {
    this.StatusBoardMove = value;
  }
  public get boardCollider(): Collider2D {
    return this.BoardCollider;
  }
  public set boardCollider(value: Collider2D) {
    this.BoardCollider = value;
  }
  public get arrowCollider(): Collider2D {
    return this.ArrowCollider;
  }
  public set arrowCollider(value: Collider2D) {
    this.ArrowCollider = value;
  }
  public get arrowNumber(): number {
    return this.ArrowNumber;
  }
  public set arrowNumber(value: number) {
    this.ArrowNumber = value;
  }
  public get statusGame(): boolean {
    return this.StatusGame;
  }
  public set statusGame(value: boolean) {
    this.StatusGame = value;
  }
  public get dotsNumber(): number {
    return this.DotsNumber;
  }
  public set dotsNumber(value: number) {
    this.DotsNumber = value;
  }
  public get dotSpacing(): number {
    return this.DotSpacing;
  }
  public set dotSpacing(value: number) {
    this.DotSpacing = value;
  }
}
