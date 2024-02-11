CREATE OR REPLACE FUNCTION before_bid_create_tg()
    RETURNS TRIGGER AS
$$
DECLARE
    _exist BOOLEAN;
BEGIN
    SELECT EXISTS(SELECT 1 FROM bids WHERE user_id = NEW.user_id AND lot_id = NEW.lot_id)
    INTO _exist;

    IF _exist THEN
        UPDATE lots
        SET last_bid = NEW.amount
        WHERE id = NEW.lot_id;
    ELSE
        UPDATE lots
        SET participants_count = participants_count + 1,
            last_bid           = NEW.amount
        WHERE id = NEW.lot_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_bid_create_hook
    BEFORE INSERT
    ON bids
    FOR EACH ROW
EXECUTE FUNCTION before_bid_create_tg();
