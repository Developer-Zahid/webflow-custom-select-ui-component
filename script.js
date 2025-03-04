function customTriggerChangeEvent(element) {
    const customChangeEvent = new Event("change");
    element.dispatchEvent(customChangeEvent);
};
var Webflow = Webflow || [];
Webflow.push(function () {
    /* Ignore Inputs Functions */
    $("form").submit(function() {
        $('[data-submit="ignore"]').replaceWith(function(){
            return $("<div>", {html: $(this).html(), class: $(this).attr('class')});
        });
    });
    $('[tf-custom-select-option-value]').attr('data-submit', 'ignore');

    /* Custom Dropdown Select Functions */
    $('[tf-custom-select-wrapper]').each(function(index, item) {
        const isMultipleSelect = item.hasAttribute("tf-custom-select-multiple");
        const $currentWrapper = $(this);
        const $currentDropdown = $(this).find('.w-dropdown');
        const $currentDropdownResultElement = $(this).find('[tf-custom-select-result]');
        const $currentHiddenInput = $(this).find('[tf-custom-select-input]');
        const $currentPlaceHolderElement = $currentDropdownResultElement.html();
        $currentHiddenInput.attr('tabindex', '-1')
        $(this).find('[tf-custom-select-option-value]').on("click", function () {
            if(isMultipleSelect){
                let selectedValuesList = [];
                let selectedOptionsElements = [];
                $(this).toggleClass('active');
                $currentWrapper.find('.active[tf-custom-select-option-value]').each(function () {
                    selectedValuesList.push($(this).attr('tf-custom-select-option-value'));
                    selectedOptionsElements.push($(this).html());
                });
                $currentHiddenInput.val(selectedValuesList);
                customTriggerChangeEvent($currentHiddenInput.get(0));
                if($currentDropdownResultElement.length > 0) {
                    $currentDropdownResultElement.html('');
                    if(selectedOptionsElements.length > 0){
                        selectedOptionsElements.map((selectedOptionsElement)=>{
                            $currentDropdownResultElement.append(selectedOptionsElement);
                        })
                    }else{
                        $currentDropdownResultElement.html($currentPlaceHolderElement);
                    }
                }
            }else{
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if($currentDropdownResultElement.length > 0) $currentDropdownResultElement.html($(this).html());
                $currentHiddenInput.val($(this).attr('tf-custom-select-option-value'));
            }
            if($currentDropdown.length > 0) $currentDropdown.trigger('w-close');
        });
    });
})
