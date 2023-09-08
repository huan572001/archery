import { _decorator, AudioSource, Component, director, find, Node } from "cc";
import { game, home } from "../constan";
import { Store } from "../Store";
import { MenuView } from "../view/MenuView";

const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property({ type: AudioSource })
  private btnAudio: AudioSource;
  @property({ type: MenuView })
  private menuView: MenuView;
  private store: Store;
  private storeNode: Node;
  protected start(): void {
    if (find("store") === null) {
      this.storeNode = new Node("store");
      this.store = this.storeNode.addComponent(Store);
    } else {
      this.storeNode = find("store");
      this.store = find("store").getComponent(Store);
    }
    if (this.store.statusAudio) {
      this.onAudio();
    } else {
      this.offAudio();
    }
  }
  private playGame(): void {
    director.addPersistRootNode(find("store"));
    director.loadScene(game);
  }

  private onBtnAudio(): void {
    this.btnAudio.play();
  }
  private offAudio(): void {
    this.menuView.offAudio();
    this.btnAudio.volume = 0;
    this.store.statusAudio = false;
  }
  private onAudio(): void {
    this.menuView.onAudio();
    this.btnAudio.volume = 1;
    this.store.statusAudio = true;
  }
}
