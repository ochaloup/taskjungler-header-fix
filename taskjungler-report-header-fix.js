<script   
   src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js">
    </script>
    <script>
    var headTop = 0;
    var tabheadCloned;
    $(document).ready(function(){
        tabheadWidth = $('.tabhead').width();
	tabheadHeight = $('.tabhead').height();
	elem = $('.tj_table_frame > tbody > tr > td > table.tj_table > tbody > tr.tabhead');
	tabheadCloned = elem.clone();
	$('> td.tabcell > table', elem).hide();  // cells in first part of table
	$('.tabhead', elem).css('height', 0);  //header cells in second part
	$('.tabhead td', elem).contents().wrap("<div style='height:0px;'></div>");
	$('td', elem).css('padding-top', 0).css('margin-top', 0).height(0);
	$('table', elem).css('padding-top', 0).css('margin-top', 0).height(0);
	$('.tabback', elem).css('margin', 0);
	
	elem.height(2); // original header hidding - not hinding but fixing height problem
	$('> td', tabheadCloned).attr('rowspan', '1'); // fixing cloned header
	$('.tabback', tabheadCloned).css('height', tabheadHeight).css('overflow', 'hidden');
	$('.tabback > div', tabheadCloned).css('height', tabheadHeight);
	newTr = $(tabheadCloned).insertBefore(elem);
	$('tr.tabhead td.tabcell', tabheadCloned).each(function(index){
	    cw = $(this).width();
	    $('table', this).width(cw);
	});
	$('tr, td, tbody, table', tabheadCloned).each(function(index){
	    cw = $(this).width();
	    $(this).width(cw);
	});
	$('.tabline', tabheadCloned).remove();
	// $(tabheadCloned).css('position', 'fixed');

	headTop = $(tabheadCloned).offset().top;
    });

    $(window).scroll(function (event) {
     //$(tabheadCloned).position({top:10});
    });
</script>
