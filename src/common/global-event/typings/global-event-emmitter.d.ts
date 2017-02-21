interface IGlobalEventEmmitter {
    /**
     * @see on( event, fn )
     */
    addEventListener(event: string, fn: (params: any[]) => void): IGlobalEventEmmitter;

    /**
     * Adds a listener for a particular event that will be invoked
     * a single time before being automatically removed
     * @param event The event that we're listening for
     * @param fn The function to call when we get the event. Parameters depend on
     * the event in question
     * @return This Emitter
     */
    on(event: string, fn: (params: any[]) => void): IGlobalEventEmmitter;

    /**
     * Removes a listener for a particular type of event. This will either
     * remove a specific listener, or all listeners for this type of event
     * @param event The event that we want to remove the listener of
     * @param fn The function to remove, or null if we want to remove all functions
     * @return This Emitter
     */
    off(event: string, fn?: () => void): IGlobalEventEmmitter;

    /**
     * @see off( event, fn )
     */
    removeListener(event: string, fn?: () => void): IGlobalEventEmmitter;

    /**
     * Removes all event listeners on this object
     * @return This Emitter
     */
    removeAllListeners(): IGlobalEventEmmitter;

    /**
     * Emits 'event' with the given args
     * @param event The event that we want to emit
     * @param args Optional arguments to emit with the event
     * @return Emitter
     */
    emit(event: string, ...params): IGlobalEventEmmitter;

    /**
     * Returns all the callbacks for a particular event
     * @param event The event that we're looking for the callbacks of
     * @return An array of callback Functions, or an empty array if we don't have any
     */
    listeners(event: string): Function[];

    /**
     * Returns if we have listeners for a particular event
     * @param event The event that we want to check if we've listeners for
     * @return True if we have listeners for this event, false otherwise
     */
    hasListeners(event: string): boolean;
}
