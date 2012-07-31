jQuery(document).ready(function() {
    maxWidth = 0;
    jQuery("#region-content").find('table').not('.sticky-header').not('.non-responsive').each(function(index){
        jQuery(this).addClass('responsive');
        if(jQuery(this).width() > maxWidth){
            maxWidth = jQuery(this).width();
        }
    });
    var switched = false;
    var updateTables = function() {
        if ((jQuery('#region-content').width() < maxWidth) && !switched ){
            switched = true;
            jQuery("table.responsive").each(function(i, element) {
                jQuery(element).addClass("rt_split");
                splitTable(jQuery(element));
            });
            return true;
        }
        else if (switched && (jQuery('#region-content').width() > maxWidth)) {
            switched = false;
            jQuery("table.responsive").each(function(i, element) {
                unsplitTable(jQuery(element));
                jQuery(element).removeClass("rt_split");
            });
        }
    };
   
    jQuery(window).load(updateTables);
    jQuery(window).load(resizeRows);
    jQuery(window).bind("resize", updateTables);
    jQuery(window).bind("resize", resizeRows);
   
	function splitTable(original){
		original.wrap("<div class='table-responsive-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive").removeClass("rt_split");
		
		original.closest(".table-responsive-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
	}
	
	function unsplitTable(original) {
        original.closest(".table-responsive-wrapper").find(".pinned").remove();
        original.unwrap();
        original.unwrap();
        original.find('tr').each(function(index){
            jQuery(this).height("auto");
        });
	}

    function resizeRows(){
        jQuery("#region-content").find(".table-responsive-wrapper").each(function(){
            copy = jQuery(this).find(".pinned");
            original = jQuery(this).find(".scrollable");
            totHeight = 0;
            original.find('tr').each(function(index){
                e = copy.find('tr:eq(' + index + ')');
                originalHeight = jQuery(this).height(); 
                copyHeight = e.height();
                if(originalHeight > copyHeight){
                    e.height(originalHeight);
                    jQuery(this).height(originalHeight);
                    totHeight = totHeight + originalHeight;
                }
                else{
                    jQuery(this).height(copyHeight);
                    e.height(copyHeight);
                    totHeight = totHeight + copyHeight;
                }
            });
//            copy.height(totHeight);
//            original.height(totHeight);
        });
    }
});
