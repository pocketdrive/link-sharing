import { LinkSharingPage } from './app.po';

describe('link-sharing App', () => {
  let page: LinkSharingPage;

  beforeEach(() => {
    page = new LinkSharingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
