-- task 1 insert a new record
INSERT INTO public.account(
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- task 2 modify the account type to admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = '1';
--task 3 delete the record
DELETE FROM public.account
WHERE account_id = '1';
--task 4 UPDATE just A PART OF THE RECORD
UPDATE public.inventory
SET inv_description = '*REP' --task 4 Update the record
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_id = 10;
--task 5 Using inner join to dislplay make and model 
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM inventory i
    INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
--task 6 replace text 
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');