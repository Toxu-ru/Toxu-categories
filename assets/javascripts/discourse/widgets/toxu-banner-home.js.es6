import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('toxu-banner-home', {
  buildKey: (attrs) => 'home-toxu',

  html(attrs, state) {
      	if (this.site.mobileView)
  		return;
    
    const { currentUser } = this;
    let contents = []
    if (currentUser) { 
    
    const trust_level = currentUser.get('trust_level');
    

    } else { 
 
contents.push(
new RawHtml({ html: `<div class="banner-toxu-t">
<div id="banner-content-t">
<h1>Toxu — место для обмена знаниями</h1>
<p class="obyav">Это место для лучшего понимания мира. Мы стремимся к достижению этой цели путём создания лучшего сайта вопросов и ответов. 
Задавайте вопросы, отвечайте, делитесь знаниями, опытом.<br> Присоединяйтесь сами и вместе с нами помогайте другим! </p>
<p><a class="kn" href="https://toxu.ru/t/kakova-missiya-toxu/1251">Миссия</a> 
<a class="kn"href="https://toxu.ru/features"> Возможности</a> 
<a class="kn"href="https://toxu.ru/badges"> Награды</a>  </p>
</div>
`})
 
   );
   
} 

return contents;

}
});
