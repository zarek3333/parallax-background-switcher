import Adapt from 'core/js/adapt';
import BackgroundSwitcherBlockView from './BackgroundSwitcherBlockView';

export default class BackgroundSwitcherPageView extends Backbone.View {

  className() {
    return 'background-switcher-container';
  }

  initialize() {
    this.addToBody();
    this.listenTo(Adapt, {
      'blockView:postRender': this.onBlockViewPostRender,
      'parallaxbgSwitcher:lowBandwidth': this.onLowBandwidthChange,
      remove: this.onRemove
    });
  }

  addToBody() {
    $('html').addClass('background-switcher-active');
    $('body').prepend(this.$el);
  }

  onBlockViewPostRender(view) {
    const options = this.model.findAncestor('contentObjects').get('_parallaxbgSwitcher');
    const aniselect = options._isActive;
    if (aniselect === false) return;
    const parallaxbgSwitcherBlockView = new BackgroundSwitcherBlockView({ model: view.model, blockView: view });
    this.$el.append(parallaxbgSwitcherBlockView.$el);
  }

  onLowBandwidthChange(value) {
    this.$el.toggleClass('backgroundswitcher-lowbandwidth', value);
  }

  onRemove() {
    $('html').removeClass('background-switcher-active');
    this.remove();
  }

}
