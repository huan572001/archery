import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MenuView")
export class MenuView extends Component {
  @property({ type: Node })
  private pupupSetting: Node;
  @property({ type: Node })
  private openAudio: Node;
  @property({ type: Node })
  private closeAudio: Node;
  public onSetting(): void {
    this.pupupSetting.active = true;
  }
  public offSetting(): void {
    this.pupupSetting.active = false;
  }
  public onAudio(): void {
    this.openAudio.active = true;
    this.closeAudio.active = false;
  }
  public offAudio(): void {
    this.openAudio.active = false;
    this.closeAudio.active = true;
  }
}
