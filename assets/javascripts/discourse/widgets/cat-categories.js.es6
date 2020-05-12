import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { number } from 'discourse/lib/formatter';
import RawHtml from 'discourse/widgets/raw-html';
import Category from "discourse/models/category";

createWidget('cat-category', {
  tagName: 'div.cat-link',
  
  html(c) {
    if (c.parent_category_id) {
      this.tagName += '.subcategory';
    }
 
    this.tagName += '.category-' +  Category.slugFor(c, '-');

    const results = [
      this.attach("category-link", { category: c, allowUncategorized: true })
    ]; 
    
    
     const unreadTotal =
      parseInt(c.get("unreadTopics"), 10) + parseInt(c.get("newTopics"), 10);
    if (unreadTotal) {
      results.push(
        h(
          "a.badge.badge-notification",
          {
            attributes: { href: c.get("url") }
          },
          number(unreadTotal)
        )
      );
    }

    if (!this.currentUser) {
      let count;

      if (c.get("show_subcategory_list")) {
        count = c.get("totalTopicCount");
      } else {
        count = c.get("topic_count");
      }

      results.push(h("b.topics-count", number(count)));
    }

    return results;
}
 
});

export default createWidget('cat-categories', {
  tagName: 'div.category-links.clearfix',

  html(attrs) {
    let title = I18n.t("filters.categories.title");
    if (attrs.moreCount > 0) {
     // title += I18n.t("categories.more", { count: attrs.moreCount });
    }

    let result = [  ];
    
    
    result = result.concat(
        h(
          "div.zag",
          h(
            "div.oglavl", title)
        )
     ); 
 
    const categories = attrs.categories;
    if (categories.length === 0) {
      return;
    }
    result = result.concat(
      categories.map(c => this.attach("cat-category", c))
    );

    var uinfo;
        if (this.currentUser) { 
        var username = this.currentUser.get('username');
        uinfo = ' — <a class="info-soc my" href="https://toxu.ru/u/'+ username +'/summary">'+ username +'</a>';
        } else { uinfo = '  '; }  
 
   result = result.concat(
  
      new RawHtml({ html: `<div class="toxu-info"><hr class="hr">
      <div class="toxu-info-soc">
      <a class="info-soc" target="_blank" href="https://toxu.ru/about">О нас</a> 
      <a class="info-soc" target="_blank" href="https://toxu.ru/faq">Вопросы</a> 
      <a class="info-soc" target="_blank" href="https://toxu.ru/help">Помощь</a> 
 
      </div>
      ©  2019 «Toxu»  ${uinfo}
      </div>`}) 
	   
     );
    
    return result;
  }
});
