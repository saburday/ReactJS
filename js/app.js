var my_news = [
  {
				author:	'Саша	Печкин',
				text:	'В	четверг,	четвертого	числа...',
        bigText: 'чччч'
		},
		{
				author:	'Просто	Вася',
				text:	'Считаю,	что	$	должен	стоить	35	рублей!',
        bigText: '$$$$$$$$$$$$'
		},
		{
				author:	'Гость',
				text:	'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000',
        bigText: 'httttttp'
		}
];

var Article = React.createClass({
  propTypes:	{
  				data:	React.PropTypes.shape({
  						author:	React.PropTypes.string.isRequired,
  						text:	React.PropTypes.string.isRequired,
  						bigText:	React.PropTypes.string.isRequired
  				})
  		},

      getInitialState:	function()	{
  				return	{
  						visible:	false
  				};
  		},

      readmoreClick:	function(e)	{
      e.preventDefault();
      this.setState({visible:	true});
  },

  render: function() {
    var author=this.props.data.author,
        text = this.props.data.text,
        bigText	=	this.props.data.bigText,
        visible	=	this.state.visible;
console.log('render',this);
    return(
      <div className="article">
       <p className="news__author">{author}:</p>
       <p className="news__text">{text}</p>
       <a	href="#"	onClick={this.readmoreClick} className={'news__readmore	'	+	(visible	?	'none':	'')}>Подробнее</a>
       <p	className={'news__big-text	'	+	(visible	?	'':	'none')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes:	{
      data:	React.PropTypes.array.isRequired
  },
  getInitialState:	function()	{
      return	{
          counter:	0
      }
  },


  render:function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
    newsTemplate = data.map(function(item, id){
      return (
        <div key = {id}>
        <Article data ={item} />
        </div>
      )
    })
  } else {
    newsTemplate = <p>К сожалению новостей нет</p>
  }

  return (
      <div className = "news">
        {newsTemplate}
        <strong className ={'news__count'+(data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var	Add	=	React.createClass({
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler:	function(e)	{
    e.preventDefault();
		},
  onCheckRuleClik:	function(e)	{
      ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
  		},
    render:	function()	{
				return	(
          <form className='add cf'>
						<input
            type='text'
            className='add__author'
            defaultValue=''
            placeholder='введите	значение'
            ref='author'
            />
            <textarea
            className='add__text'
            defaultValue=''
            placeholder='Текст новости'
            ref='text'
            ></textarea>
            <label className='add__checkrule'>
            <input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClik}/>Я согласен с правилами
            </label>
          <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled>
          Показать	alert
          </button>
          </form>
				);
		}
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <Add	/>
        <News data={my_news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,

  document.getElementById('root')
);
