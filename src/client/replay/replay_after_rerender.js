/**
 * Author: Jeff Whelpley
 * Date: 6/2/15
 *
 * This replay strategy assumes that the client completely re-rendered
 * the page so reboot will need to find the element in the new client
 * rendered DOM that matches the element it has in memory.
 */
var domSelector = require('../select/dom_selector');

/**
 * Loop through all events and replay each by trying to find a node
 * that most closely resembles the original.
 *
 * @param events
 * @param strategy
 * @param opts
 * @returns {Array}
 */
function replayEvents(events, strategy, opts) {
    var i, eventData, serverNode, clientNode, event;
    var remainingEvents = [];
    events = events || [];

    // loop through the events, find the appropriate client node and dispatch the event
    for (i = 0; i < events.length; i++) {
        eventData = events[i];
        event = eventData.event;
        serverNode = eventData.node;

        console.log('attempting to find ' + serverNode.tagName + ' for replay');
        clientNode = domSelector.findClientNode(serverNode, opts);

        if (clientNode) {
            console.log('found node ' + clientNode.tagName + ' and dispatching event');
            clientNode.dispatchEvent(event);
        }
        else {
            console.log('did not find node for ' + clientNode.tagName);
            remainingEvents.push(eventData);
        }
    }

    return remainingEvents;
}

module.exports = {
    replayEvents: replayEvents
};