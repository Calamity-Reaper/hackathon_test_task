CREATE OR REPLACE FUNCTION after_bid_create_tg()
    RETURNS TRIGGER AS
$$
DECLARE
    _not_first BOOLEAN;
BEGIN
    SELECT EXISTS(SELECT 1 FROM bids b WHERE b.lot_id = NEW.lot_id AND b.user_id = NEW.user_id);

    IF NOT _not_first THEN
        UPDATE lots
        SET participants_count = participants_count + 1
        WHERE id = NEW.lot_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_bid_create_hook
    AFTER INSERT
    ON bids
    FOR EACH ROW
EXECUTE FUNCTION after_bid_create_tg();
