﻿(function ($)
{
    $.sendFeedback = function (options)
    {
        var settings = $.extend({
            instructionText: 'Use Your Mouse to Highlight any Problems.',
            instructionColor: '#f00',
            instructionSize: '40px',
            overlayColor: '#ff0',
            overlayOpacity: '.15',
            overlayZIndex: '9000000',
            highlightBorderColor: '#f00',
            highlightBorderWidth: '3px',
            highlightBorderStyle: 'solid',
            highlightBorderRadius: '5px',
            formTextColor: '#000',
            formBackgroundColor: '#fff',
            formBorderColor: '#000',
            formBorderWidth: '1px',
            formBorderStyle: 'solid',
            url: ''
        }, options);

        var $feedbackContainer = $('<div></div>').appendTo('body');

        var $feedbackOverlay = $('<div></div>')
        .css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: settings.overlayColor,
            opacity: settings.overlayOpacity,
            left: '0',
            top: '0',
            zIndex: settings.overlayZIndex,
            textAlign: 'center'
        })
        .appendTo($feedbackContainer);

        var $feedbackInstructions = $('<div></div>').css({
            position: 'absolute',
            width: '100%',
            left: '0',
            top: '35%',
            zIndex: settings.overlayZIndex - 1,
            textAlign: 'center',
            fontSize: settings.instructionSize,
            fontWeight: 'bold',
            color: settings.instructionColor,
            fontFamily: 'Arial'
        })
        .text(settings.instructionText)
        .appendTo($feedbackContainer)
        .hide();

        var $feedbackForm = $('<div></div>').css({
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '300px',
            height: '300px',
            padding: '10px',
            color: settings.formTextColor,
            backgroundColor: settings.formBackgroundColor,
            borderStyle: settings.formBorderStyle,
            borderWidth: settings.formBorderWidth,
            borderColor: settings.formBorderColor,
            borderRadius: '10px 0 0 0',
            zIndex: settings.overlayZIndex + 1
        });
        $('<div></div>').css({
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '10px'
        })
        .text('Send Feedback')
        .appendTo($feedbackForm);
        $('<textarea></textarea>').css({
            width: '290px',
            height: '200px',
            marginBottom: '10px'
        })
        .val('Please describe the problem in detail.')
        .appendTo($feedbackForm);
        $('<input type="button" value="Send" />').click(function (e)
        {
            alert('function not yet complete');
        })
        .appendTo($feedbackForm);
        $('<input type="button" value="Cancel" />').click(function (e)
        {
            $feedbackContainer.remove();
        })
        .appendTo($feedbackForm);
        $feedbackForm.appendTo($feedbackContainer);

        var originalCoords = { top: 0, left: 0 };

        var $currentHighlight;

        $feedbackOverlay.bind('mousedown', function (e)
        {
            $currentHighlight = $('<div></div>').css({
                width: '1px',
                height: '1px',
                borderStyle: settings.highlightBorderStyle,
                borderWidth: settings.highlightBorderWidth,
                borderColor: settings.highlightBorderColor,
                borderRadius: settings.highlightBorderRadius,
                position: 'absolute',
                left: e.pageX,
                top: e.pageY,
                zIndex: settings.overlayZIndex - 1
            })
            .appendTo('body');
            originalCoords = { top: e.pageY, left: e.pageX };
        });

        $feedbackOverlay.bind('mousemove', function (e)
        {
            if ($currentHighlight)
            {
                var newCoords = { top: e.pageY, left: e.pageX };

                if (newCoords.top < originalCoords.top) $currentHighlight.css('top', newCoords.top);
                if (newCoords.left < originalCoords.left) $currentHighlight.css('left', newCoords.left);

                $currentHighlight.height(Math.abs(newCoords.top - originalCoords.top));
                $currentHighlight.width(Math.abs(newCoords.left - originalCoords.left));
            }
        });

        $feedbackOverlay.bind('mouseup', function (e)
        {
            $currentHighlight = null;
        });

        $feedbackInstructions.fadeIn(3000, function ()
        {
            setTimeout(function ()
            {
                $feedbackInstructions.fadeOut(1000);
            }, 2000);
        });

        $feedbackOverlay.height($(document).height());
    }
})(jQuery);